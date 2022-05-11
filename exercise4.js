const input = [
    { nombre: "Pedro", edad: 20, ciudad: "Córdoba" },
    { nombre: "Paricia", edad: 22, ciudad: "Córdoba" },
    { nombre: "José", edad: 23, ciudad: "Mendoza" },
    { nombre: "María", edad: 20, ciudad: "Córdoba" },
    { nombre: "Juan", edad: 20, ciudad: "Córdoba" },
    { nombre: "Ana", edad: 22, ciudad: "Córdoba" },
  ]
  
  const result = input.filter(v => v.ciudad === "Córdoba").sort((x, y) => {
    const n = x.edad - y.edad
    if (n !== 0)
      return n
  
    return x.nombre < y.nombre ? -1 : 1
  }).map(v => v.nombre)
  
  console.log(result)

  
  