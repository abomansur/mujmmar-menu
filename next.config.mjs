/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // هذا السطر يحول الموقع لملفات HTML ثابتة
  images: {
    unoptimized: true, // ضروري جداً لظهور الصور على هوستنجر
  },
};

export default nextConfig;