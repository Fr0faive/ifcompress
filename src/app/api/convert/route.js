import multer from 'multer';
import { exec } from 'child_process';
import { promises as fs } from 'fs';

const upload = multer({ dest: '/tmp' }); // Store the uploaded file temporarily in /tmp

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {

  
  const convertAudio = async (filePath, outputFormat) => {
    return new Promise((resolve, reject) => {
        const outputPath = `/tmp/output.${outputFormat}`;
        exec(`ffmpeg -i ${filePath} -vn -acodec libmp3lame -ar 44100 -ac 2 ${outputPath}`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(outputPath);
            }
        })
    })
}
const fileHandlingMiddleware = upload.single("audioFile");

fileHandlingMiddleware(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }

    try {
        const convertedFilePath = await convertAudio(req.file.path, 'mp3'); // Convert to mp3 for this example
        const fileBuffer = await fs.readFile(convertedFilePath);

        res.setHeader('Content-Disposition', 'attachment; filename=converted.mp3');
        res.setHeader('Content-Type', 'audio/mpeg');
        res.end(fileBuffer);

        // Cleanup temp files
        await fs.unlink(req.file.path);
        await fs.unlink(convertedFilePath);
    } catch (error) {
        res.status(500).json({ error: 'Error converting audio.' });
    }
})
}