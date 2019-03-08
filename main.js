console.log(document.querySelector(".origin"))
const DragDropManager = Object.create(null, {
    init: {
        value: () => {
            const stages = document.querySelectorAll(".stage")

            stages.forEach(stage => {
                // Gain reference of item being dragged
                stage.ondragstart = e => {
                    e.dataTransfer.setData("text", e.target.classList)
                }
            })


            const targets = document.querySelectorAll(".target");
            /*
                Created new variable to represent the origin element(center container). Then used the same event handler as below expect didn't need to loop through an array. The event handler makes sure it only drops the dragged item into the origin by checking its class list. It will not drop a box into another box. You must drop the box into the negative space in the origin container.
            */
            const origin = document.querySelector(".origin");

            origin.ondragover = e => e.preventDefault();

            origin.ondrop = e => {
                e.preventDefault()

                const newData = e.dataTransfer.getData("text");

                if (e.target.classList.contains("origin")) {
                    e.target.appendChild(document.querySelector(`.${newData.split(" ")[1]}`))
                }
            }

            targets.forEach(target => {
                // Dragover not supported by default. Turn that off.
                target.ondragover = e => e.preventDefault()

                target.ondrop = e => {
                    // Enabled dropping on targets
                    e.preventDefault()

                    // Determine what's being dropped
                    const data = e.dataTransfer.getData("text")

                    // Append card to target component as child
                    // Added if statement that only allows the box to be dropped into a container if it has no childnodes. This only holds true for the header and footer since they are seperate classes and use a different handler.

                    if (e.target.hasChildNodes() === false) {
                        e.target.appendChild(document.querySelector(`.${data.split(" ")[1]}`))
                        console.log(e.target);
                    }
                }
            })


        }
    }
})

DragDropManager.init()