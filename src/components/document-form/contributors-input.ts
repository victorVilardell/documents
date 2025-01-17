export default class ContributorsInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .contributors {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 8px;
      }
        .contributors label {
          display: flex;
          flex-direction: column;
          font-size: 12px;
        }
      .contributor-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .contributor-item span {
        flex-grow: 1;
      }
      .contributor-item button {
        margin-left: 8px;
      }
    `;

    const container = document.createElement("div");
    container.className = "contributors";
    container.innerHTML = `
      <label for="contributorIdInput">Contributor ID
        <input type="text" id="contributorIdInput" name="contributorIdInput" placeholder="Add contributor id" pattern="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}">
      </label>
      <label for="contributorNameInput">Contributor Name
        <input type="text" id="contributorNameInput" name="contributorNameInput" placeholder="Add contributor name">
      </label>
      <button type="button" id="addContributor">Add</button>
      <ul id="contributorList"></ul>
    `;

    const contributorIdInput = container.querySelector(
      "#contributorIdInput"
    ) as HTMLInputElement;
    const contributorNameInput = container.querySelector(
      "#contributorNameInput"
    ) as HTMLInputElement;
    const contributorList = container.querySelector(
      "#contributorList"
    ) as HTMLUListElement;
    const addContributorButton = container.querySelector(
      "#addContributor"
    ) as HTMLButtonElement;

    addContributorButton.addEventListener("click", () => {
      const contributorIdValue = contributorIdInput.value.trim();
      const contributorNameValue = contributorNameInput.value.trim();
      if (contributorIdValue && contributorNameValue) {
        const listItem = document.createElement("li");
        listItem.className = "contributor-item";
        listItem.innerHTML = `<span>${contributorIdValue}</span> <span>${contributorNameValue}</span><button type="button" class="removeContributor">Remove</button>`;
        contributorList.appendChild(listItem);
        contributorIdInput.value = "";
        contributorNameInput.value = "";

        listItem
          .querySelector(".removeContributor")
          ?.addEventListener("click", () => {
            listItem.remove();
          });
      }
    });

    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  getContributors(): { Id: string; Name: string }[] {
    const shadow = this.shadowRoot;
    if (!shadow) return [];
    const contributorList = shadow.querySelector(
      "#contributorList"
    ) as HTMLUListElement;
    return Array.from(contributorList.querySelectorAll("li")).map((li) => {
      const spans = li.querySelectorAll("span");
      return {
        Id: spans[0].textContent || "",
        Name: spans[1].textContent || "",
      };
    });
  }
}

if (!customElements.get("contributors-input")) {
  customElements.define("contributors-input", ContributorsInput);
}
