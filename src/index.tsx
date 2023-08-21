import React from 'react'
import { createRoot } from 'react-dom/client'
import FlightPlanner from 'app/FlightPlanner'


createRoot(document.getElementById('app'))
	.render(<FlightPlanner />)
