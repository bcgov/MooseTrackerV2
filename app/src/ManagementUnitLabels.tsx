import * as turf from '@turf/turf'
import featuresGeoJson from './management-units-geojson.json'

export const featureCenters = featuresGeoJson.features.map((feature: any) => {
    const id = feature.id
    const groupedCenters = []

    for(let i = 0; i < feature.geometry.coordinates.length; i++){
        const points = turf.points(feature.geometry.coordinates[i])
        const center = turf.center(points)
        groupedCenters.push(center)
    }

    if (groupedCenters.length > 1){
        return {
            'id': id,
            'center': groupedCenters
        }
    }
})