/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "randomuser.me"
            },
            {
                protocol: "https",
                hostname: "utfs.io"
            },
            {
                protocol: "https",
                hostname: "uploadthing.com"
            },
            {
                protocol: "https",
                hostname: "j5cdigs2pn.ufs.sh"
            }
        ]
    }
};

export default nextConfig;
