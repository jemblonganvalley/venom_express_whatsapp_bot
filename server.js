const express = require("express")
const cors = require("cors")
const { pesanMasuk, jawaban } = require("./constants/message")
const auth_route = require("./routes/auth_routes")
const auth_check = require("./middleware/auth_check")
const path = require("path")
require("dotenv").config()
const venom = require("venom-bot")

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))



const initializeVenom = async (req, res, next) => {
    req.client = await venom.create();
    next();
};

app.use(initializeVenom);
app.use("/api", auth_route)


app.get("/api/read", (req, res) => {
    return res.status(200).json({
        success: true
    })
})

// api kirim pesan
app.post("/api/send_message", auth_check, async (req, res) => {
    try {
        const { to, text, client } = await req.body
        const sendMessage = await client.sendText(`${to}@c.us`, text)

        if (sendMessage.erro) {
            res.status(401).json({
                success: false,
                error: sendMessage.erro
            })
            return
        }

        return res.status(200).json({
            success: true,
            msg: "Pesan berhasil terkirim"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})



app.listen(PORT, "0.0.0.0", () => {
    console.info("server berjalan")
})