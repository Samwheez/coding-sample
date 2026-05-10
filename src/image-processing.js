class SpecimenProcessor {
    async processImages(userDir, eventHandler) {
        const uploadDir = path.join(userDir, 'upload');
        const outJson = path.join(userDir, 'out.json');
        
        try {
            const images = fs.readdirSync(uploadDir);
            const results = {};
            for (let i = 0; i < images.length; i++) {
                eventHandler('current-image', images[i]);
                const res = await this.#processSingleImage(path.join(uploadDir, images[i]), eventHandler);
                results[images[i]] = JSON.parse(res);
                eventHandler('progress', i + 1);
                
                // eventHandler('table-update', results[images[i]]);
            }

            fs.writeFileSync(outJson, JSON.stringify(results, null, 4), 'utf8');

            return results;
        } catch (err) {
            return err;
        }
    }

    async #processSingleImage(imagePath, eventHandler) {
        const image = fs.readFileSync(imagePath, 'base64');

        eventHandler('processing-step', 'Extracting labels');
        const labels = await this.#extractLabels(image);
        
        eventHandler('processing-step', 'Transcribing verbatim text');
        const transcription = await this.#transcribeImage(labels);
        console.log(transcription);

        eventHandler('processing-step', 'Extracting fields from text');
        const result = await this.#bucketExtraction(transcription);
        console.log(result);

        return result;
    }
}

module.exports = { SpecimenProcessor };
