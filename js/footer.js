const template =document.createElement('template')
template.innerHTML =`
<footer class="w-100 py-4 flex-shrink-0">
        <div class="container py-4">
            <div class="row gy-4 gx-5">
                <div class="col-lg-4 col-md-4">
                    <h5 class="h1 text-gold">La nostra pagina</h5>
                    <p class="small text-muted"><b>TrackingFitness</b> consente di controllare<br> informazioni, come la distanza percorsa<br> e le calorie consumate durante l'attività fisica.</p>
                    <p class="small text-muted mb-0">&copy; <b>Copyrights. Tutti i diritti riservati.</b><br> <a class="text" href="index.html" style="color: gold;">TrackingFitness.com</a></p>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="text-gold mb-3">Link Pagine</h5>
                    <ul class="list-unstyled text-muted">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="login.html">Accedi/Registrati</a></li>
                        <li><a href="statistiche.html">Statistiche</a></li>
                        <li><a href="Suggerimenti&Consigli.html">Consigli</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="text-gold mb-3">Link Social</h5>
                    <ul class="list-unstyled text-muted">
                        <li><a href="https://www.instagram.com" target="_blank"><i class="bi-icon bi-instagram"></i>Instagram</a></li>
                        <li><a href="https://www.facebook.com" target="_blank"><i class="bi-icon bi-facebook"></i>Facebook</a></li>
                        <li><a href="https://www.tiktok.com" target="_blank"><i class="bi-icon bi-tiktok"></i>TikTok</a></li>
                        <li><a href="https://twitter.com" target="_blank"><i class="bi-icon bi-twitter"></i>Twitter</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    `
document.body.appendChild(template.content)