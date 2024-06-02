console.clear();
import express from 'express';
import getConfig from './config';
import Discord from './Discord/Discord';

const app = express();
let discord: Discord | null;

app.get('/:url(*)', async (req, res) => {
    if (discord == null) return res.status(500).send("Server error.");

    const encodedUrl = req.params.url;
    const decodedUrl = decodeURIComponent(encodedUrl);
    if (decodedUrl == "" || decodedUrl == "favicon.ico") 
        return res.redirect('https://github.com/ShufflePerson/Discord_CDN');

    try {
        const fullLink = await discord.fetchLatestLink(decodedUrl);
        res.redirect(fullLink);
    } catch (ex) {
        if (ex.message)
            console.error(ex.message);
        else 
            console.log(ex)
        res.status(502).send("Something went wrong. Please ask the Server Owner to check the Console to see the issue.")
    }
});

app.get('*', (req, res) => {
  res.redirect(`This domain can be used by anyone to redirect to the latest URL of a Discord attachment. It runs https://github.com/ShufflePerson/Discord_CDN, so all credits should go to them.

Contact Discord to report illegal content, as it's their responsibility to handle such issues on their servers. For anything else, contact admin(@)spy.pet.`);
});

async function initServer() {
    const config = await getConfig();
    discord = new Discord(config);

    app.listen(config.PORT, () => {
        console.log(`Server can be accessed from http://localhost:${config.PORT}`);
    })
}

initServer();