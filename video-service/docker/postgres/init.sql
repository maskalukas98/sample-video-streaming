CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS video_quality (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL,
    video_size BIGINT NOT NULL,
    quality INTEGER NOT NULL,
    format VARCHAR(4) NOT NULL,
    is_default BOOLEAN NOT NULL,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);


INSERT INTO videos (title)
VALUES ('Lionel Messi - skills');

INSERT INTO video_quality (video_id, quality, format, video_size, is_default)
VALUES (1, 144, 'mp4', 24648644, false),
       (1, 240, 'mp4', 36264068, false),
       (1, 360, 'mp4', 54786293, false),
       (1, 480, 'mp4', 75008304, true);


