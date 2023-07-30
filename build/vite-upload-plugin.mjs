import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'public/assets/images')
  },
  filename (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, `img_${+new Date()}${ext}`)
  },
})

export const uploader = () => {
  return {
    name: 'vite-upload-plugin',
    configureServer(server) {
      const upload = multer({ storage }).single('file')

      server.middlewares.use('/upload-img', (req, res) => {
        upload(req, res, () => {
          const mdImg = `![img](/${req.file.path.replace(/^public\//, '')})`
          res.end(mdImg)
        })
      })
    }
  }
}
