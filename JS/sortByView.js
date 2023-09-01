// Sort by view function

const loadSortData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  const data = await res.json();
  const videoData = data.data;

  //   console.log(videoData.others.views);
  let vData = [];
  videoData.forEach((view) => {
    vData.push(view);
  });

  const value = vData.sort((a, b) => {
    const vOne = parseFloat(a.others.views);
    const vTwo = parseFloat(b.others.views);
    return vTwo - vOne;
  });

  const displayContainer = document.getElementById("display-view");

  displayContainer.textContent = "";

  const noContent = document.getElementById("no-content");
  if (vData.length === 0) {
    noContent.classList.remove("hidden");
  } else {
    noContent.classList.add("hidden");
  }

  vData.forEach((video) => {
    const view = video.others;

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
            <div id="viewId" class="flex justify-end">
                ${convertSec(video.others.posted_date)}
                
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
                   ${verifiedUser(author.verified)}
                   
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
