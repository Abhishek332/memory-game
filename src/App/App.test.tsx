import {render, screen} from '@testing-library/react';
import App from './App';

jest.mock('../components/GameContainer/GameContainer', ()=>jest.fn().mockImplementation(()=><div>GameContainer</div>));

jest.mock('../components/Head/Head', ()=>jest.fn().mockImplementation(()=><div>Head</div>));

describe('App', ()=>{
    it('should contain Head and GameContainer', ()=>{
        render(<App/>);

        expect(screen.getByText('Head')).toBeInTheDocument();
        expect(screen.getByText('GameContainer')).toBeInTheDocument();
    })
})