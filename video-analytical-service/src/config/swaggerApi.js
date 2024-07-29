/**
 * @openapi
 * /api/v1/video-stats/{videoId}:
 *   get:
 *     summary: Get total views for a video
 *     description: Retrieve the total views for a specific video by its ID.
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the video to get the stats for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with total views
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_views:
 *                   type: integer
 *                   example: 12345
 *       404:
 *         description: Video not found
 */ 
