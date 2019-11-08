const redis = require("ioredis")
const s = "rediss://:)"
const client = new redis(s)
const pub = new redis(s)

client.on("error", (err) => {
    console.log("Error", err)
})

client.get("test", (err, val) => {
    console.log(`got ${val.toString()}`)
})

client.subscribe("testP")

client.on("message", (chan, msg) => {
    console.log(`Got message: ${msg} from Channel: ${chan}`)
})

setTimeout(() => {
    setInterval(() => {
        console.log("Sending")
        pub.publish("testP", "yay")
    }, 1000)
}, 1000)
