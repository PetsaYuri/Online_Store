import { createClient } from '@supabase/supabase-js';
import { S3Client } from '@aws-sdk/client-s3';
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_API_KEY || '');
import { Readable } from 'stream';

async function uploadImage(image: Readable & { truncated?: boolean }, filename: string) {
    const buffer = await streamToBuffer(image);

    const { data, error } = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME || '').upload(`uploads/${filename}`, buffer, {
        contentType: 'image/jpeg'
    });

    if (error) {
        console.log(error);
    } else {
        console.log(data)
    }
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

export default uploadImage;