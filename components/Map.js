import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { observer } from 'mobx-react-lite'
import 'leaflet/dist/leaflet.css'

import styles from './Map.module.scss'
import CountriesStore from '../store/countries';

const componentDidMount = () => {
    CountriesStore.getAllCountries();
}

const MarkerList = observer(() => <>
    {
        CountriesStore.countries.map(
            (country, index) => {
                const position = {
                    lat: country.latlng[0],
                    lon: country.latlng[1]
                }

                const Icon = L.icon({
                    iconUrl: country.flags.svg,
                    iconSize: [40, 25],
                    popupAnchor: [0, 0],
                })

                return <Marker
                    key={index}
                    position={[position.lat, position.lon]}
                    icon={Icon}>
                    <Popup>
                        <h3>{country.name.common}</h3>
                        <h4>Population: {country.population}</h4>
                    </Popup>
                </Marker>
            }
        )
    }
</>)

export default function Map() {

    useEffect(() => {
        componentDidMount()
    }, [])

    return (
        <div className={styles.Map}>
            <MapContainer center={[51.505, -0.09]} zoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerList />
            </MapContainer>
        </div>
    )
}