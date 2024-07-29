/**
 * @openapi
 * /api/v1/video/{videoId}:
 *   get:
 *     summary: Get video details
 *     description: Fetches details of a specific video by its ID.
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         description: ID of the video to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video details successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Title of the video
 *                 qualities:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: List of video qualities
 *                 totalViews:
 *                   type: integer
 *                   description: Total number of views
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */