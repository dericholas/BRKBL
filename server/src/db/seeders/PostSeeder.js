import { Post, User } from "../../models/index.js"

class PostSeeder {
    static async seed() {  
        const postObjects = [
            { caption: "Thrilling downhill ride on fresh powder slopes!", image: "https://brkbl-production.s3.amazonaws.com/alex-lange-pv14V3sRB0c-unsplash.jpg", userId: null },
            { caption: "Gearing up for an epic backcountry adventure!", image: "https://brkbl-production.s3.amazonaws.com/banff-sunshine-village-UoBE_wJ-suk-unsplash.jpg", userId: null },
            { caption: "Enjoying panoramic views while carving the slopes!", image: "https://brkbl-production.s3.amazonaws.com/benjamin-hayward-YIO9Fb7BJIU-unsplash.jpg", userId: null },
            { caption: "Powder days are the best days!", image: "https://brkbl-production.s3.amazonaws.com/bradley-dunn-9SGGun3iIig-unsplash.jpg", userId: null },
            { caption: "Chasing the perfect line through untouched snow!", image: "https://brkbl-production.s3.amazonaws.com/colin-lloyd-iTzUDUjeOj4-unsplash.jpg", userId: null },
            { caption: "Skiing with friends is always a blast!", image: "https://brkbl-production.s3.amazonaws.com/colin-lloyd-pzZmPqPdAIE-unsplash.jpg", userId: null },
            { caption: "Fresh tracks and bluebird skies – paradise found!", image: "https://brkbl-production.s3.amazonaws.com/eirik-uhlen-U5YfxhSze8k-unsplash.jpg", userId: null },
            { caption: "Finding solitude in the snowy wilderness.", image: "https://brkbl-production.s3.amazonaws.com/erik-odiin-YDB1P399ijc-unsplash.jpg", userId: null },
            { caption: "Powder hounds unite for some serious shredding!", image: "https://brkbl-production.s3.amazonaws.com/felipe-giacometti-ACbHQqST3sY-unsplash.jpg", userId: null },
            { caption: "Snowboarding: where gravity is your best friend.", image: "https://brkbl-production.s3.amazonaws.com/felipe-giacometti-FN4cCdslXuE-unsplash.jpg", userId: null },
            { caption: "Carving turns like there's no tomorrow!", image: "https://brkbl-production.s3.amazonaws.com/guillaume-groult-HYUAgt8vGtA-unsplash.jpg", userId: null },
            { caption: "Skiing through a winter wonderland!", image: "https://brkbl-production.s3.amazonaws.com/haut-risque-3WqzE236Hhw-unsplash.jpg", userId: null },
            { caption: "Embracing the thrill of the mountain.", image: "https://brkbl-production.s3.amazonaws.com/joris-berthelot-EnTU_hr9wPA-unsplash.jpg", userId: null },
            { caption: "Skiing: the perfect blend of grace and adrenaline.", image: "https://brkbl-production.s3.amazonaws.com/wojciech-then-tUWAb8f7UZw-unsplash.jpg", userId: null },
            { caption: "Skiing under a blanket of stars – pure magic!", image: "https://brkbl-production.s3.amazonaws.com/lovovna-IMoNduugud0-unsplash.jpg", userId: null },
            { caption: "Snowboarding: where every day is a snow day!", image: "https://brkbl-production.s3.amazonaws.com/visit-almaty-wN4D-mVR7fE-unsplash.jpg", userId: null },
            { caption: "Sending it off cliffs and dropping into powder.", image: "https://brkbl-production.s3.amazonaws.com/matthieu-petiard-Pf6e3o0GL4M-unsplash.jpg", userId: null },
            { caption: "Finding freedom in every carve.", image: "https://brkbl-production.s3.amazonaws.com/max-kukurudziak-_8h7TrklnHQ-unsplash.jpg", userId: null },
            { caption: "Powder slashes and endless smiles!", image: "https://brkbl-production.s3.amazonaws.com/patrick-t-kindt-NzU9rrmaBu4-unsplash.jpg", userId: null },
            { caption: "Exploring new lines and pushing limits.", image: "https://brkbl-production.s3.amazonaws.com/perfect-snacks-SaRcln5IcE8-unsplash.jpg", userId: null },
        ];

        const userArray = await User.query()
        const getRandomUserId = (users) => {
            const index = Math.floor(Math.random() * users.length)
            return users[index].id
        }

        for (const post of postObjects) {
            post.userId = getRandomUserId(userArray)
            await Post.query().insert(post)
        }
    }
}

export default PostSeeder