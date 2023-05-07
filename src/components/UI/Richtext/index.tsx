import React, { useEffect, useMemo, useRef, useCallback } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useField } from "formik"
import useStyles from "./styles"
import { Typography } from "@mui/material"

interface Props {
  name?: string
  value: ReactQuill.Value
  onChangeText: React.Dispatch<React.SetStateAction<any>>
}

const Richtext = ({ value, onChangeText, name }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = name ? useField(name) : [null]
  const classes = useStyles()
  const ref = useRef<any>()

  var Image = Quill.import('formats/image')
  Image.className = 'richTextImage'
  Quill.register(Image, true)

  const imageHandler = useCallback (() => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.click()
    // const range = ref.current.getSelection(true)

    // Listen upload local image and save to server
    input.onchange = async () => {
      const file = input.files && input.files[0]
      const range = ref.current.getEditor().getSelection()
      if (file) {
        const fd = new FormData()
        fd.append("files", file)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
          method: "POST",
          body: fd,
        })
        
        const data: { urls: string[] } = await res.json()

        // file type is only image.
        if (/^image\//.test(file.type)) {
          ref.current.getEditor().insertEmbed(range.index, 'image', data.urls[0])
        } else {
          console.warn("You could only upload images.")
        }
      }
    }
  },[])

  const modules = useMemo(()=>({

    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        [{ align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
        ["code-block"],
      ],
      handlers: {
        image: imageHandler,
      },
    },

  }),[])

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ]

  useEffect(() => {
    if (value === "<p><br></p>" || value === "") {
      //   onChangeText('')
    }
  }, [value])

  useEffect(() => {
    ((document.getElementsByClassName("ql-editor") as HTMLCollectionOf<HTMLElement>)[0].style.overflowY = "scroll"),
    ((document.getElementsByClassName("ql-editor") as HTMLCollectionOf<HTMLElement>)[0].style.height = "300px")
  }, [])

  return (
    <div style={{ marginBottom: 20 }}>
      <ReactQuill ref={ref} theme="snow" value={value} onChange={onChangeText} formats={formats} modules={modules} />
      {meta?.error && (
        <Typography component={"div"} className={classes.error}>
          {meta.error}
        </Typography>
      )}
    </div>
  )
}

export default Richtext
