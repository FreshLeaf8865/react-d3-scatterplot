const coords = []

for (let i = 0; i < 100; i++) {
    coords.push({
        distance: Math.random(),
        color: '#0000ff',
        label: `Label ${i}`,
        imageUrl: 'https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300',
        id: `${Math.random()}`
    })
}

export default coords
