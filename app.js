document.addEventListener('DOMContentLoaded', () => {
    // Fetch crop data from JSON file
    fetch('./data/crops.json')
        .then(response => response.json())
        .then(data => {
            const cropsData = data;
            // Set up event listeners for input fields
            document.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', () => {
                    // Get input values
                    const N = parseFloat(document.getElementById('N').value) || 0;
                    const P = parseFloat(document.getElementById('P').value) || 0;
                    const K = parseFloat(document.getElementById('K').value) || 0;
                    const temperature = parseFloat(document.getElementById('temperature').value) || 0;
                    const humidity = parseFloat(document.getElementById('humidity').value) || 0;
                    const ph = parseFloat(document.getElementById('ph').value) || 0;
                    const rainfall = parseFloat(document.getElementById('rainfall').value) || 0;

                    // Get recommendations
                    const recommendedCrops = recommendCrops(cropsData, N, P, K, temperature, humidity, ph, rainfall);

                    // Display results
                    const resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = '';

                    if (recommendedCrops.size > 0) {
                        resultsDiv.innerHTML = '<h2>Recommended Crops:</h2>';
                        recommendedCrops.forEach(cropName => {
                            resultsDiv.innerHTML += `<p>${cropName}</p>`;
                        });
                    } else {
                        resultsDiv.innerHTML = '<p>No suitable crops found for the given conditions.</p>';
                    }
                });
            });
        })
        .catch(error => console.error('Error loading crop data:', error));
});

// Function to recommend crops based on soil nutrients and environmental conditions
function recommendCrops(cropsData, N, P, K, temperature, humidity, ph, rainfall) {
    const recommendedCrops = new Set();

    cropsData.forEach(crop => {
        if (
            Math.abs(crop.N - N) <= 10 &&
            Math.abs(crop.P - P) <= 10 &&
            Math.abs(crop.K - K) <= 10 &&
            Math.abs(crop.temperature - temperature) <= 5 &&
            Math.abs(crop.humidity - humidity) <= 15 &&
            Math.abs(crop.ph - ph) <= 1 &&
            Math.abs(crop.rainfall - rainfall) <= 50
        ) {
            recommendedCrops.add(crop.label);
        }
    });

    return recommendedCrops;
}
