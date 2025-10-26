const links = document.querySelectorAll('nav li');

icons.addEventListener('click',()=>{
    nav.classList.toggle('active')
})

links.forEach((link)=>{
    link.addEventListener("click",()=>{
        nav.classList.remove('active')
    })
})




//////////////////partie Projets ////////////////////

fetch('projects.json')
    .then(response => response.json())
    .then(data => afficherProjets(data))
    .catch(error => console.error('Erreur de chargement des projets :', error));

    function afficherProjets(projets) {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; 

    projets.forEach(projet => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        card.innerHTML = `
        <div class="card-header">
            <h2>${projet.titre}</h2>
            <p>${projet.description}</p>
        </div>
        <div class="card-body">
            <div class="tech-list">
            ${projet.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="features" style="display:none;">
            <h4>Détails du projet :</h4>
            <ul>
                ${projet.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
            </div>
        </div>
        <div class="card-footer">
            <a href="${projet.lien_code}" target="_blank" class="btn btn-code">Code source</a>
            <a href="${projet.lien_demo}" target="_blank" class="btn btn-demo">Voir le site</a>
        </div>
        `;

        const body = card.querySelector('.card-body');
        const features = body.querySelector('.features');
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = "Plus d'infos";
        toggleBtn.classList.add('btn', 'btn-code');
        toggleBtn.style.marginTop = "1rem";

        toggleBtn.addEventListener('click', () => {
        const visible = features.style.display === "block";
        features.style.display = visible ? "none" : "block";
        toggleBtn.textContent = visible ? "Plus d'infos" : "Moins d'infos";
        });

        body.appendChild(toggleBtn);
        container.appendChild(card);
    });
}
