import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {getVideo} from "../../api/videoApi";
import {config} from "../../tempEnv";

const StyledRoundedSpan = styled.span`
    background-color: #b3b3b3;
    margin-right: 15px;
    padding: 8px 15px;
    font-size: 19px;
    font-weight: bold;
    border-radius: 20px;
    color: #3d3d3d;
`

const StyledQualityDivWrapper = styled.div`
    z-index: 1;
    margin-bottom: 20px;
    
    & > span {
        cursor: pointer;
        
        &:hover {
            background-color: #8a8a8a;
        }
        
        &.selected {
            background-color: #0ca57e;
            color: #02130f;
        }
    }
`

const StyledVideo = styled.video`
    border-radius: 20px;
`

const StyledVideoTitleH1 = styled.h1`
    margin-top: 15px;
    color: #fff;
`

const StyledRootDiv = styled.div`
`

const StyledBottomVideoBarDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

// temp values only for testing
const videoId = 1

export const VideoPlayer = () => {
    const [videoTitle, setVideoTitle] = useState("");
    const [qualities, setQualities] = useState<number[]>([])
    const [selectedQuality, setSelectedQuality] = useState(0);
    const [totalViews, setTotalViews] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const data = await getVideo()

                if(data.qualities && data.qualities.length > 0) {
                    setVideoTitle(data.title)
                    setQualities(data.qualities)
                    setSelectedQuality(data.qualities[data.qualities.length - 1])
                    setTotalViews(data.totalViews)
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchVideoData();
    }, []);

    const onClick = (quality: number) => {
        if(selectedQuality === quality) {
            return;
        }

        setSelectedQuality(quality)

        if(!videoRef.current) {
            return
        }

        const videoCurrentTime = videoRef.current.currentTime
        const videoElement = videoRef.current as HTMLVideoElement;
        // move to env
        videoElement.src = `${config.videoServiceUrl}/video/${videoId}/stream?quality=${quality}`;
        videoElement.load();

        const handleLoadedMetadata = () => {
            videoElement.currentTime = videoCurrentTime
            videoElement.play();
            videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };

        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return <StyledRootDiv>
        {
            selectedQuality
            && <>
                <StyledQualityDivWrapper>
                    {
                        qualities.map((quality, i) => {
                            return <StyledRoundedSpan
                                key={quality}
                                className={ quality === selectedQuality ? 'selected' : '' }
                                onClick={() => onClick(quality)}
                            >
                        {quality}p
                    </StyledRoundedSpan>
                        })
                    }
                </StyledQualityDivWrapper>

                <StyledVideo width="1000" height="562" controls ref={videoRef}>
                    <source src={`${config.videoServiceUrl}/video/${videoId}/stream?quality=${selectedQuality}`} type="video/mp4"/>
                    Your browser does not support the video tag.
                </StyledVideo>

                <StyledBottomVideoBarDiv>
                    <StyledVideoTitleH1>{ videoTitle }</StyledVideoTitleH1>
                    <StyledRoundedSpan>Total views { totalViews }</StyledRoundedSpan>
                </StyledBottomVideoBarDiv>
            </>
        }
    </StyledRootDiv>
}