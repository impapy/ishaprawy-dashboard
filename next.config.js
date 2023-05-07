/** @type {import('next').NextConfig} */
const withSvgr = require("@newhighsco/next-plugin-svgr")

const nextConfig = withSvgr({
  reactStrictMode: true,
  images: {
    domains: [
      "b-ridge-static.s3.eu-west-1.amazonaws.com",
      "hbs-static.s3.eu-west-1.amazonaws.com",
      "ishaprawy-picklegum-static.s3.eu-west-1.amazonaws.com",
      "media.istockphoto.com",
      "i.pinimg.com",
    ],
  },
})

module.exports = nextConfig
