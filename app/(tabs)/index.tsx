import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('Atlanta'); 
  const [loading, setLoading] = useState(false);

  const apiKey = '3f796feadfc14b76932182356252701';

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (selectedCity: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&aqi=no`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : weather ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>{city} Weather</Text>
          <Text style={styles.info}>Temperature: {weather.current.temp_f} °F</Text>
          <Text style={styles.info}>Condition: {weather.current.condition.text}</Text>
          <Text style={styles.info}>Humidity: {weather.current.humidity}%</Text>
          <Text style={styles.info}>Wind Speed: {weather.current.wind_mph} mph</Text>
        </View>
      ) : (
        <Text style={styles.info}>Select a city to view weather data.</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Atlanta"
          onPress={() => setCity('Atlanta')}
          color="#229462"
        />
        <Button
          title="New York"
          onPress={() => setCity('New York')}
          color="#229462"
        />
        <Button
          title="Chicago"
          onPress={() => setCity('Chicago')}
          color="#229462"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bf7c8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  weatherContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 16,
  },
});
