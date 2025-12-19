import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const { imageUrls } = await request.json();

        if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
            return NextResponse.json(
                { error: "URLs das imagens são obrigatórias" },
                { status: 400 }
            );
        }

        // Extract public_ids from Cloudinary URLs
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{ext}
        const publicIds = imageUrls.map((url: string) => {
            const parts = url.split('/');
            const folderAndFile = parts.slice(-2).join('/'); // e.g., "furniture-shop/filename"
            const publicId = folderAndFile.replace(/\.[^/.]+$/, ''); // Remove extension
            return publicId;
        });

        // Delete images from Cloudinary
        const deletePromises = publicIds.map((publicId: string) => 
            cloudinary.uploader.destroy(publicId)
        );

        const results = await Promise.all(deletePromises);

        return NextResponse.json({
            success: true,
            deleted: results,
        });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { error: "Falha ao deletar as imagens" },
            { status: 500 }
        );
    }
}
