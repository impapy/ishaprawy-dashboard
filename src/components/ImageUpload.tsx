/** @jsxImportSource @emotion/react */
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { useField } from "formik"
import { ButtonBase, CircularProgress, Stack, styled, Theme, Typography } from "@mui/material"
import { css } from "@emotion/react"
import axios from "axios"
import { readPsd } from "ag-psd"

import { centerAll } from "styles/shared"
import { PlusCircleIcon } from "assets/images/icons"
import { ContactSupportOutlined } from "@mui/icons-material"

// Import the Cloudinary classes.
import { fill } from "@cloudinary/url-gen/actions/resize"
import { CloudinaryImage } from "@cloudinary/url-gen"

interface Props {
  label?: string
  name: string
  srcURL?: string
  getImageUrl?: (image: string) => void
}

const ImageUpload: React.FC<Omit<Props, "onFileChange">> = ({ name, label, getImageUrl, srcURL }) => {
  const [field, meta, helpers] = useField(name)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const ref = useRef<HTMLDivElement | undefined>(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Render the image in a React component.
    // return (
    //   <div>
    //     <AdvancedImage cldImg={myImage} />
    //   </div>
    // )

    const file = e.target.files![0]
    if (!file) return

    const image = new FormData()

    image.append("files", file)
    // const myImage = new CloudinaryImage("sample", {
    //   cloudName: "dnayvifgg",
    //   apiKey: "331287636636593",
    //   apiSecret: "T2b6bo1r6ZvRyrJ8D70n6pEnANM",
    //   // authToken: undefined,
    // }).resize(fill().width(100).height(150))

    // console.log(myImage)
    image.append("upload_preset", "my-upload")

    const res = await fetch(`https://api.cloudinary.com/v1_1/dnayvifgg/image/upload`, {
      method: "POST",
      body: image,
    })
    // .then((data) => console.log(data))
    const data = await res.json()
    console.log(data)

    if (getImageUrl) getImageUrl(data.url)

    if (!data) {
      setUploading(false)
      return
    }

    setUploading(false)
    helpers.setValue(data.url)
  }

  useEffect(() => {
    if (!field.value || !isPSD(field.value)) return
    ;(async () => {
      const { data } = await axios.get(field.value, {
        responseType: "arraybuffer",
      })

      const psd = readPsd(data)

      psd.canvas!.style.width = `${ref?.current?.clientWidth}px`
      psd.canvas!.style.height = `${ref?.current?.clientHeight}px`

      ref.current?.appendChild(psd.canvas!)
    })()
  }, [field.value])

  useEffect(() => {
    if (srcURL && srcURL?.length > 0) {
      helpers.setValue(srcURL)
    }
  }, [srcURL])

  return (
    <>
      <StyledImageUpload
        css={(theme) =>
          meta.error &&
          meta.touched &&
          css`
            border: 1px dashed ${(theme as Theme).palette.error.main};
            color: ${(theme as Theme).palette.error.main};
          `
        }
        onClick={() => fileRef.current!.click()}
      >
        {uploading ? (
          <CircularProgress />
        ) : (
          <>
            <Stack alignItems="center" spacing={1}>
              {!field.value && (
                <>
                  <PlusCircleIcon />
                  {label && (
                    <Typography variant="body2" color="inherit">
                      {label}
                    </Typography>
                  )}
                </>
              )}
            </Stack>
            {/* @ts-ignore: Unreachable code error */}
            <StyledImageContainer ref={ref}>
              {!isPSD(field.value) && field.value && (
                <Image
                  src={field.value}
                  alt={label}
                  layout="fill"
                  objectFit="cover"
                  blurDataURL={shimmer}
                  placeholder="blur"
                  style={{ backgroundColor: "white" }}
                />
              )}
            </StyledImageContainer>
          </>
        )}
      </StyledImageUpload>

      <input
        type="file"
        accept="image/png, image/jpeg, image/psd"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={handleChange}
      />
    </>
  )
}

export default ImageUpload

export const StyledImageUpload = styled(ButtonBase)(
  ({ theme }) => `
  padding: ${theme.spacing(3)};
  background: #F9FAFB;
  border: 1px dashed ${theme.palette.text.secondary};
  box-shadow: 0px 1px 2px rgba(35, 35, 169, 0.05);
  border-radius: ${theme.shape.borderRadius};
  width: 126.1px;
  height: 116.02px;
`,
)
export const StyledImageContainer = styled("div")(
  ({ theme }) => `
  ${centerAll}
  height: 95%;
  width: 95%;
  border-radius: ${theme.shape.borderRadius};
  overflow: hidden;
`,
)

const isPSD = (url: string) => {
  return url?.endsWith(".vnd.adobe.photoshop") || url?.endsWith(".psd")
}

const shimmer =
  "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNzAwIiB0bz0iNzAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg=="
