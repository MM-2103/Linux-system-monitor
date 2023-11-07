window.onload = (event) => {
const ctx = document.getElementById('memoryChart').getContext('2d');
        const memoryChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Time labels will be pushed here
                datasets: [{
                    label: 'Free Memory',
                    data: [], // Free memory data will be pushed here
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Used Memory',
                    data: [], // Used memory data will be pushed here
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                return value + ' MB'
                            }
                        }
                    }
                }
            }
        });

        // WebSocket connection
        const ws = new WebSocket('ws://localhost:3000/ws');

        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            const currentDate = new Date().toLocaleTimeString();
    
            // Assume we have two datasets: one for free memory, another for used memory
            if (memoryChart.data.datasets.length > 1) {
                memoryChart.data.labels.push(currentDate);
                memoryChart.data.datasets[0].data.push(data.freeMemory); // Convert to MB for free memory
                memoryChart.data.datasets[1].data.push(data.usedMemory); // Convert to MB for used memory
                memoryChart.update();
    
                // Remove old data points
                if (memoryChart.data.labels.length > 60) { // Keep last 60 data points
                    memoryChart.data.labels.shift();
                    memoryChart.data.datasets.forEach((dataset) => {
                        dataset.data.shift();
                    });
                }
            }
        };

        ws.onerror = function(event) {
            console.error("WebSocket error observed:", event);
        };
    };