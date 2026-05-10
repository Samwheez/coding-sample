// Server-Sent Event route
app.get('/progress', SSEMiddleware, (req, res) => {
    try {
        const user_id = getUser(req);
        const userDir = path.join(config.ephemeralDir, user_id);

        specimen_processor.processImages(userDir, (eventID, data) => {
            res.write(`event: ${eventID}\n`);
            res.write(`data: ${data}\n\n`);
        }).then((result) => {
            res.write(`event: finished\n`);
            res.write(`data: Finished\n\n`);
            res.end();
        });
        req.on('close', () => {
            res.end();
        });
    } catch (err) {
        console.error(err);
        res.sendFile('placeholder.html');
    }
});