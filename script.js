 // Add your JavaScript code here
        // Check if "tasks" key exists in localStorage
        if (!localStorage.getItem("tasks")) {
            // If it doesn't exist, initialize it with an empty array
            localStorage.setItem("tasks", JSON.stringify([]));
        }

        const close = document.querySelector("#closebtn");
        const overlay = document.querySelector("#overlay");
        const makebtn = document.querySelector("#makebtn");
        const maketask = document.querySelector("#maketask");
        const vacant = document.querySelector(".vacant");
        const title = document.querySelector("#title");
        const data = document.querySelector("#data");

        makebtn.addEventListener("click", function(){
            overlay.style.display = "block";
        });

        close.addEventListener("click", function(){
            overlay.style.display = "none";
        });

        function getCurrentDateTime() {
            const now = new Date();
            const dateTimeString = now.toLocaleString();
            return dateTimeString;
        }

        function printer(){
            const alltasks = localStorage.getItem("tasks");
            const parsedTasks = JSON.parse(alltasks);
            var clutter = "";
            parsedTasks.forEach(function(elem, index){
                clutter += `<div class="w-40 p-5 bg-zinc-600 text-2xl rounded-lg card">
                                <h1 class="font-semibold">${elem.title}</h1>
                                <p class="mt-2 text-xs font-regular">${elem.data}</p>
                                <p class="mt-2 text-xs font-regular">Created: ${elem.dateTime}</p>
                                <button class="delete-btn text-xs rounded-md bg-red-600 px-3 py-1" data-index="${index}">Delete</button>
                            </div>`;
            });
            document.querySelector(".cards").innerHTML = clutter;
            if(parsedTasks.length > 0){
                vacant.style.display = "none";
            }
            attachDeleteListeners();
        }

        function attachDeleteListeners() {
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(function(button){
                button.addEventListener('click', function(){
                    const index = button.getAttribute('data-index');
                    deleteTask(index);
                });
            });
        }

        function deleteTask(index) {
            const allTasks = JSON.parse(localStorage.getItem("tasks"));
            allTasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(allTasks));
            printer();
        }

        printer();

        maketask.addEventListener("click", function(){
            const valueoftitle = title.value;
            const valueofdata = data.value;
            const dataofinputs = {
                title : valueoftitle,
                data : valueofdata,
                dateTime: getCurrentDateTime()
            };
            const allpreviousTasks = localStorage.getItem("tasks");
            const allpreviousTasksparsed = JSON.parse(allpreviousTasks);
            allpreviousTasksparsed.push(dataofinputs);
            const stringifiedTasks = JSON.stringify(allpreviousTasksparsed);
            localStorage.setItem("tasks", stringifiedTasks);
            title.value = "";
            data.value = "";
            overlay.style.display = "none";
            printer();
        });

        window.addEventListener("keydown", function(dets){
            if(dets.keyCode === 27){
                overlay.style.display = "none";
            }
        });