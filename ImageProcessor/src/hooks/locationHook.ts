import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {getImageTitle} from '../utils/language';

interface LocationState {
  cityCountry: string;
  countryCode: string;
  imageTitle: string;
  loading: boolean;
}

export const useLocation = (): LocationState => {
  const [state, setState] = useState<LocationState>({
    cityCountry: 'Detecting location...',
    countryCode: 'IN',
    imageTitle: 'My Image',
    loading: true,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setState(s => ({
              ...s,
              loading: false,
              cityCountry: 'Permission denied',
            }));
            return;
          }
        }

        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            try {
              // Free reverse geocoding via open-meteo / nominatim
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                {headers: {'Accept-Language': 'en'}},
              );
              const data = await res.json();
              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                '';
              const countryCode =
                data.address?.country_code?.toUpperCase() || 'IN';
              const country = data.address?.country || '';

              setState({
                cityCountry: `${city}, ${country}`,
                countryCode,
                imageTitle: getImageTitle(countryCode),
                loading: false,
              });
            } catch {
              setState(s => ({
                ...s,
                loading: false,
                cityCountry: 'Location found',
              }));
            }
          },
          error => {
            console.warn(error);
            setState(s => ({
              ...s,
              loading: false,
              cityCountry: 'Unable to get location',
            }));
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000},
        );
      } catch (e) {
        setState(s => ({...s, loading: false}));
      }
    };

    fetchLocation();
  }, []);

  return state;
};
