const template =document.createElement('template')
template.innerHTML =`
<footer class="w-100 py-4 flex-shrink-0">
        <div class="container py-4">
            <div class="row gy-4 gx-5">
                <div id="textFooter" class="col-lg-4 col-md-4">
                    <h5 class="h1 text-gold">La nostra pagina</h5>
                    <p class="small text-muted"><b>TrackingFitness</b> consente di controllare<br> informazioni, come la distanza percorsa<br> e le calorie consumate durante l'attività fisica.</p>
                    <p class="small text-muted mb-0">&copy; <b>Copyrights. Tutti i diritti riservati.</b><br> <a class="text" href="index.html" style="color: gold;">TrackingFitness.com</a></p>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="text-gold mb-3">Link Pagine</h5>
                    <ul class="list-unstyled text-muted">
                        <li><a href="index.html" class="text-decoration-none">Home</a></li>
                        <li><a href="login.html" class="text-decoration-none">Accedi/Registrati</a></li>
                        <li><a href="statistiche.html" class="text-decoration-none">Statistiche</a></li>
                        <li><a href="Suggerimenti&Consigli.html" class="text-decoration-none">Consigli</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="text-gold mb-3">Link Social</h5>
                    <ul class="list-unstyled text-muted">
                        <li><a href="https://www.instagram.com" target="_blank" class="text-decoration-none"><i class="bi-icon bi-instagram"> <span id="instagram">Instagram</span></i></a></li>
                        <li><a href="https://www.facebook.com" target="_blank" class="text-decoration-none"><i class="bi-icon bi-facebook"> <span id="facebook">Facebook</span></i></a></li>
                        <li><a href="https://www.tiktok.com" target="_blank" class="text-decoration-none"><i class="bi-icon bi-tiktok"> <span id="tiktok">TikTok</span></i></a></li>
                        <li><a href="https://twitter.com" target="_blank" class="text-decoration-none"><i class="bi-icon bi-twitter"> <span id="twitter">Twitter</span></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    `
document.body.appendChild(template.content)