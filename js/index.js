const footerTemplate = `
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">TrackingFitness</h5>
                            <ul class="list-unstyled mb-0">
                                <li><a href="#" class="text-decoration-none text-light">About Us</a></li>
                                <li><a href="#" class="text-decoration-none text-light">Contact</a></li>
                                <li><a href="#" class="text-decoration-none text-light">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="#" class="text-decoration-none text-light">Home</a></li>
                                <li><a href="#" class="text-decoration-none text-light">Features</a></li>
                                <li><a href="#" class="text-decoration-none text-light">Pricing</a></li>
                                <li><a href="#" class="text-decoration-none text-light">FAQs</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <h5 class="text-uppercase">Follow Us</h5>
                            <ul class="list-unstyled">
                                <li><a href="#" class="text-decoration-none text-light"><i class="bi bi-facebook"></i> Facebook</a></li>
                                <li><a href="#" class="text-decoration-none text-light"><i class="bi bi-twitter"></i> Twitter</a></li>
                                <li><a href="#" class="text-decoration-none text-light"><i class="bi bi-instagram"></i> Instagram</a></li>
                                <li><a href="#" class="text-decoration-none text-light"><i class="bi bi-linkedin"></i> LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="text-center p-3">
                        <p>&copy; 2023 TrackingFitness. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;

const footerElement = document.createElement('div');
footerElement.innerHTML = footerTemplate;
document.body.appendChild(footerElement);