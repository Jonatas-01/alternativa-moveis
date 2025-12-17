import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        // Validate: max 3 images
        if (files.length > 3) {
            return NextResponse.json(
                { error: "Máximo de 3 imagens permitidas" },
                { status: 400 }
            );
        }

        // Validate: all are images
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ];
        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                return NextResponse.json(
                    {
                        error: "Somente imagens JPEG, PNG e WebP são permitidas",
                    },
                    { status: 400 }
                );
            }
        }

        // Upload all images to Cloudinary
        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise<{ url: string; public_id: string }>(
                (resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            {
                                folder: "furniture-shop",
                                resource_type: "image",
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else if (result) {
                                    resolve({
                                        url: result.secure_url,
                                        public_id: result.public_id,
                                    });
                                }
                            }
                        )
                        .end(buffer);
                }
            );
        });

        const uploadedImages = await Promise.all(uploadPromises);

        return NextResponse.json({
            success: true,
            images: uploadedImages,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Falha ao enviar as imagens" },
            { status: 500 }
        );
    }
}
