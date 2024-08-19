const fs = require('fs');
const readline = require('readline');

// Load crop data
const cropsData = JSON.parse(fs.readFileSync('./data/crops.json', 'utf8'));

// Create an interface for reading console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to recommend crops based on soil nutrients and environmental conditions
function recommendCrops(N, P, K, temperature, humidity, ph, rainfall) {
    console.log("\nRecommendations based on the provided soil and environmental conditions:");
    
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
            recommendedCrops.add(crop.name);
        }
    });

    if (recommendedCrops.size > 0) {
        console.log("Recommended Crops:");
        recommendedCrops.forEach(cropName => console.log(`- ${cropName}`));
    } else {
        console.log("No suitable crops found for the given conditions.");
    }
}

// Start the application
console.log("Welcome to the Crop and Soil Management System!");

rl.question("Enter Nitrogen level (N): ", function(N) {
    rl.question("Enter Phosphorus level (P): ", function(P) {
        rl.question("Enter Potassium level (K): ", function(K) {
            rl.question("Enter Temperature (°C): ", function(temperature) {
                rl.question("Enter Humidity (%): ", function(humidity) {
                    rl.question("Enter pH level: ", function(ph) {
                        rl.question("Enter Rainfall (mm): ", function(rainfall) {
                            recommendCrops(
                                parseFloat(N),
                                parseFloat(P),
                                parseFloat(K),
                                parseFloat(temperature),
                                parseFloat(humidity),
                                parseFloat(ph),
                                parseFloat(rainfall)
                            );
                            rl.close();
                        });
                    });
                });
            });
        });
    });
});
