document.addEventListener("DOMContentLoaded", function () {
    const storyContainer = document.getElementById("story");
    const choicesContainer = document.getElementById("choices");
    const codeModal = document.getElementById("codeModal");
    const closeModal = document.querySelector(".close");

    // Show modal for code input
    function showCodeModal() {
        codeModal.style.display = "flex";
    }

    // Hide modal
    closeModal.addEventListener("click", function () {
        codeModal.style.display = "none";
    });

    // Handle code submission
    document.getElementById("submitCode").addEventListener("click", function () {
        const code = document.getElementById("codeInput").value;
        const encryptedCode = btoa("876543"); // Encrypt the code
        if (code === atob(encryptedCode)) { // Decrypt and compare
            codeModal.style.display = "none";
            customAlert("Correct Code! Proceeding to the next scene...");
        } else {
            customAlert("Incorrect Code! Try again.");
        }
    });

    // Show game container when Play button is clicked
    document.getElementById("playButton").addEventListener("click", function () {
        document.querySelector(".container").style.display = "none";
        document.getElementById("gameContainer").style.display = "flex";
        showScene("start");
        showCodeModal(); // Show code input modal
    });

    // Scene management
    function showScene(sceneKey) {
        const scene = scenes[sceneKey];
        if (!scene) {
            console.error("Scene not found:", sceneKey);
            return;
        }

        storyContainer.innerHTML = scene.text;
        choicesContainer.innerHTML = "";

        if (scene.choices) {
            scene.choices.forEach(choice => {
                const button = document.createElement("button");
                button.innerText = choice.text;
                button.className = "choiceButton";
                button.onclick = () => showScene(choice.nextScene);
                choicesContainer.appendChild(button);
            });
        }
    }

    const endingStyles = {
        "passAndLoseFriends": "color: green; font-size: 30px; font-weight: bold;",
        "failWithSupport": "color: orange; font-size: 30px; font-weight: bold;",
        "suspendedForCheating": "color: red; font-size: 30px; font-weight: bold;",
        "dropOutDueToBullying": "color: gray; font-size: 30px; font-weight: bold;"
    };

    const scenes = {
        start: {
            text: "Raúl Andujar is a bright student determined to be the best in his class. However, the pressure is mounting as finals approach. His friends invite him to hang out, but he knows he needs to study. What should he do?",
            choices: [
                { text: "Study hard and skip hanging out", nextScene: "studyHard" },
                { text: "Hang out with friends and study later", nextScene: "hangOut" }
            ]
        },
        studyHard: {
            text: "Raúl spends the entire weekend studying. He feels confident but notices his friends are starting to drift away. During the exam, he notices something strange—someone is passing notes. The teacher catches Raúl looking and accuses him of cheating. What should he do?",
            choices: [
                { text: "Deny the accusation and defend yourself", nextScene: "denyAccusation" },
                { text: "Stay silent and accept the blame", nextScene: "acceptBlame" }
            ]
        },
        hangOut: {
            text: "Raúl decides to hang out with his friends. They have a great time, but he falls behind on his studies. The night before the exam, he realizes he’s unprepared. What should he do?",
            choices: [
                { text: "Pull an all-nighter to study", nextScene: "allNighter" },
                { text: "Go to sleep and hope for the best", nextScene: "hopeForTheBest" }
            ]
        },
        denyAccusation: {
            text: "Raúl defends himself, but the teacher doesn’t believe him. He’s suspended for cheating, even though he’s innocent. His friends try to support him, but he feels betrayed by the system.",
            choices: [
                { text: "Continue", nextScene: "suspendedForCheating" }
            ]
        },
        acceptBlame: {
            text: "Raúl stays silent and accepts the blame. He’s suspended, and his reputation is ruined. His friends try to comfort him, but he feels like he’s lost everything.",
            choices: [
                { text: "Continue", nextScene: "suspendedForCheating" }
            ]
        },
        allNighter: {
            text: "Raúl pulls an all-nighter and manages to pass the exam. He becomes the top student in his class, but his friends feel neglected and stop talking to him. Raúl feels lonely but proud of his achievement.",
            choices: [
                { text: "Continue", nextScene: "passAndLoseFriends" }
            ]
        },
        hopeForTheBest: {
            text: "Raúl goes to sleep and hopes for the best. Unfortunately, he fails the exam. His friends support him, but he feels like he’s let himself down.",
            choices: [
                { text: "Continue", nextScene: "failWithSupport" }
            ]
        },
        passAndLoseFriends: {
            text: `<span style='${endingStyles.passAndLoseFriends}'>Raúl becomes the top student in his class but loses his friends in the process. He feels accomplished but lonely.</span>`,
            choices: []
        },
        failWithSupport: {
            text: `<span style='${endingStyles.failWithSupport}'>Raúl fails the exam, but his friends support him. Despite their encouragement, he feels like he’s failed himself.</span>`,
            choices: []
        },
        suspendedForCheating: {
            text: `<span style='${endingStyles.suspendedForCheating}'>Raúl is suspended for cheating, even though he’s innocent. His friends try to help, but he feels betrayed by the system.</span>`,
            choices: []
        },
        dropOutDueToBullying: {
            text: `<span style='${endingStyles.dropOutDueToBullying}'>Raúl drops out of school due to relentless bullying. He feels like he’s lost his future.</span>`,
            choices: []
        },
        // New Scenes
        bullyingScene: {
            text: "Raúl starts experiencing bullying from a group of classmates. They mock him for being a 'teacher’s pet' and spread rumors about him. Raúl feels isolated and unsure of what to do.",
            choices: [
                { text: "Report the bullying to a teacher", nextScene: "reportBullying" },
                { text: "Ignore the bullying and focus on studies", nextScene: "ignoreBullying" }
            ]
        },
        reportBullying: {
            text: "Raúl reports the bullying to a teacher, but the teacher dismisses it as 'kids being kids.' The bullies find out and intensify their harassment. Raúl feels even more alone.",
            choices: [
                { text: "Continue", nextScene: "bullyingGetsWorse" }
            ]
        },
        ignoreBullying: {
            text: "Raúl tries to ignore the bullying, but it starts affecting his mental health. He struggles to concentrate in class and feels like he’s losing control.",
            choices: [
                { text: "Continue", nextScene: "mentalHealthDecline" }
            ]
        },
        bullyingGetsWorse: {
            text: "The bullying gets worse. Raúl is cornered in the hallway by the bullies, who threaten him. He feels like he has no way out.",
            choices: [
                { text: "Stand up to the bullies", nextScene: "standUpToBullies" },
                { text: "Run away and avoid them", nextScene: "runAway" }
            ]
        },
        standUpToBullies: {
            text: "Raúl stands up to the bullies, but they retaliate violently. He’s left bruised and humiliated. The school does nothing to help.",
            choices: [
                { text: "Continue", nextScene: "dropOutDueToBullying" }
            ]
        },
        runAway: {
            text: "Raúl runs away from the bullies, but they chase him. He trips and falls, injuring himself. The bullies laugh and leave him there.",
            choices: [
                { text: "Continue", nextScene: "dropOutDueToBullying" }
            ]
        },
        mentalHealthDecline: {
            text: "Raúl’s mental health continues to decline. He starts skipping classes and avoids his friends. His grades plummet, and he feels like he’s hit rock bottom.",
            choices: [
                { text: "Continue", nextScene: "dropOutDueToBullying" }
            ]
        },
        // Cliffhanger Scene
        cliffhanger: {
            text: "One day, Raúl receives an anonymous note in his locker: 'Meet me after school if you want to end this.' He’s unsure whether it’s a trap or a genuine offer for help.",
            choices: [
                { text: "Go to the meeting", nextScene: "meetingAfterSchool" },
                { text: "Ignore the note", nextScene: "ignoreNote" }
            ]
        },
        meetingAfterSchool: {
            text: "Raúl decides to go to the meeting. He waits nervously, but no one shows up. Just as he’s about to leave, he hears footsteps behind him...",
            choices: [] // Cliffhanger with no options
        },
        ignoreNote: {
            text: "Raúl ignores the note, but the bullying continues. He feels like he’s running out of options and wonders if he’ll ever escape this nightmare.",
            choices: [] // Cliffhanger with no options
        }
    };

    // Custom alert function
    function customAlert(message) {
        const alertBox = document.createElement("div");
        alertBox.style.position = "fixed";
        alertBox.style.top = "50%";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translate(-50%, -50%)";
        alertBox.style.backgroundColor = "#fff";
        alertBox.style.color = "#000";
        alertBox.style.padding = "20px";
        alertBox.style.borderRadius = "5px";
        alertBox.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        alertBox.style.zIndex = "1000";
        alertBox.textContent = message;

        const closeButton = document.createElement("button");
        closeButton.textContent = "OK";
        closeButton.style.marginTop = "10px";
        closeButton.style.padding = "5px 10px";
        closeButton.style.backgroundColor = "#000";
        closeButton.style.color = "#fff";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "3px";
        closeButton.style.cursor = "pointer";
        closeButton.addEventListener("click", function () {
            document.body.removeChild(alertBox);
        });

        alertBox.appendChild(closeButton);
        document.body.appendChild(alertBox);
    }
});
