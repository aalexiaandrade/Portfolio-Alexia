import { useEffect, useState } from 'react'
import {
  BatteryFull,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Volume2,
  Wifi,
} from 'lucide-react'

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-19.9167&longitude=-43.9345&current=temperature_2m,weather_code,is_day&timezone=America%2FSao_Paulo'

function getWeatherPresentation(code, isDay) {
  if (code === 0) return { icon: isDay ? Sun : CloudSun, pt: 'Céu limpo', en: 'Clear sky' }
  if ([1, 2].includes(code)) return { icon: CloudSun, pt: 'Parcialmente nublado', en: 'Partly cloudy' }
  if (code === 3 || [45, 48].includes(code)) return { icon: Cloud, pt: code === 3 ? 'Nublado' : 'Neblina', en: code === 3 ? 'Overcast' : 'Fog' }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: CloudRain, pt: 'Chuva', en: 'Rain' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: CloudSnow, pt: 'Neve', en: 'Snow' }
  if ([95, 96, 99].includes(code)) return { icon: CloudLightning, pt: 'Trovoadas', en: 'Thunderstorms' }
  return { icon: CloudSun, pt: 'Clima', en: 'Weather' }
}

export default function WeatherClock({ time, date, theme = 'light', language = 'pt' }) {
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(false)
  const en = language === 'en'
  const dark = theme === 'dark'
  const hover = dark ? 'hover:bg-white/10' : 'hover:bg-violet-100/80'

  useEffect(() => {
    let cancelled = false

    async function loadWeather() {
      try {
        const response = await fetch(WEATHER_URL)
        if (!response.ok) throw new Error('Weather request failed')
        const data = await response.json()
        if (cancelled) return
        setWeather(data.current)
        setWeatherError(false)
      } catch {
        if (!cancelled) setWeatherError(true)
      }
    }

    loadWeather()
    const refresh = setInterval(loadWeather, 15 * 60 * 1000)
    return () => {
      cancelled = true
      clearInterval(refresh)
    }
  }, [])

  const presentation = weather
    ? getWeatherPresentation(weather.weather_code, weather.is_day)
    : { icon: CloudSun, pt: 'Carregando clima', en: 'Loading weather' }
  const WeatherIcon = presentation.icon
  const condition = en ? presentation.en : presentation.pt

  return (
    <div className="ml-1 flex items-center gap-1 sm:ml-2 sm:gap-2">
      <div
        className={`flex items-center gap-1.5 rounded-lg px-2 py-1 ${hover}`}
        title={weatherError ? (en ? 'Weather unavailable' : 'Previsão indisponível') : `${condition} • Belo Horizonte`}
        aria-label={weatherError ? (en ? 'Weather unavailable' : 'Previsão indisponível') : `${condition}, ${weather?.temperature_2m ?? '—'}°C, Belo Horizonte`}
      >
        <WeatherIcon size={20} className="shrink-0 text-violet-500" />
        <span className="flex flex-col leading-tight">
          <span className="text-xs font-semibold tabular-nums">
            {weatherError ? '—°C' : weather ? `${Math.round(weather.temperature_2m)}°C` : '…'}
          </span>
          <span className="hidden text-[10px] opacity-70 sm:block">{en ? 'Belo Horizonte' : 'Belo Horizonte'}</span>
        </span>
      </div>

      <div className="hidden items-center gap-2 sm:flex"><Wifi size={15} /><Volume2 size={15} /><BatteryFull size={17} /></div>
      <div className={`rounded-lg px-2 py-1 text-right ${hover}`} title={en ? 'Date and time' : 'Data e hora'}>
        <p className="text-xs font-medium tabular-nums">{time}</p>
        <p className="text-[10px] tabular-nums">{date}</p>
      </div>
    </div>
  )
}
