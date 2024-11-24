import waitForCompletion from "./library/poll.js"

const URL = "http://localhost:3000/status";

(async () => {

    const pollHelper = await waitForCompletion(URL, 10, 5000);
    console.log(pollHelper);

})();
