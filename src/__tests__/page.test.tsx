import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
 
describe('Simple react render', () => {
  it('renders a Home page', () => {
    render(<Page />)
    
    const heading = screen.getByText('Home')
    expect(heading).toBeInTheDocument()
  })
})