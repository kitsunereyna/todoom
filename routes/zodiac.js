const express = require("express"); 
const router = express.Router();

router.get('/zodiac', (req, res) =>{
    const cookies = req.cookies?.userAuth;

    if (cookies) {
        const name = cookies?.name;
        const timeFirst = cookies?.timeFirst;
        const timeLast = Date.now();
        const userSession = Math.floor((timeLast - timeFirst) / 1000);
        const minutes = Math.floor(userSession/60);
        const seconds = Math.floor(userSession - (minutes*60));

        const greeting = `Hi, ${name}!`
        const sessionPeriod = `You've been there for ${minutes} minutes and ${seconds} seconds`
        res.render('zodiac', {greeting: greeting, sessionPeriod: sessionPeriod})
    }

    res.render('zodiac', {greeting: "", sessionPeriod: ""})
})

module.exports = router;