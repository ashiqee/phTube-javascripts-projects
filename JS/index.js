//get fetch data from api

const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  console.log(data.data);

  const categoryContainer = document.getElementById("category-list");

  const catData = data.data;

  catData.forEach((category) => {
    const div = document.createElement("div");

    // console.log(category.category_id);
    // div.classList.add("tabs");

    div.innerHTML = `
    <a  onclick="loadVideo('${category.category_id}')" class="tab btn bg-slate-300 act" >${category.category}</a>
    
    `;
    categoryContainer.appendChild(div);
  });
};

// active btn
const activeTab = document.querySelectorAll("act");

activeTab.forEach((tabs) => {
  tabs.addEventListener("click", (e) => {
    tabs.classList.add("bg-red-400");
  });
});

const loadVideo = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const videoData = data.data;
  console.log(data.data);
  const displayContainer = document.getElementById("display-view");

  displayContainer.textContent = "";

  const noContent = document.getElementById("no-content");
  if (videoData.length === 0) {
    noContent.classList.remove("hidden");
  } else {
    noContent.classList.add("hidden");
  }
  //condition part

  videoData.forEach((video) => {
    video.authors.forEach((author) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class=" bg-base-200  rounded-md overflow-hidden shadow-xl">
        <div class="flex flex-col mx-auto ">
            <div class="rounded-lg w-full h-[268px]  overflow-hidden ">
              <img
              class="object-cover w-full h-full "
                src="${video.thumbnail}"
                alt="video" />
            </div>
            <div class="px-0 mt-5">
              <div class="avatar flex items-start">
                <div class="w-10 rounded-full">
                  <img src="${author.profile_picture}" />
                </div>
                <h2 class="text-lg font-bold px-2 ">${video.title}</h2>
              </div>
              <div class="mx-12 mb-5">
              
              <div class="flex gap-1">
                <p class="font-medium text-gray-400">${author.profile_name}
             
                </p>
                   ${
                     !author.verified
                       ? author.verified
                       : `
                    <img
                      src="images/verified.png"
                      alt=""
                      class="w-6"
                      srcset=""></img>
                  `
                   }
              </div>
              <p class="font-medium text-gray-400">${
                video?.others?.views
              } views</p>
              </div>
            </div>
            </div>
        </div>

`;
      displayContainer.appendChild(div);
    });
  });
};

loadCategory();
loadVideo(1000);
