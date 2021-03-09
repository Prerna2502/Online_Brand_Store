import Footer from '../../Footer/Footer'
import enzyme,{shallow} from 'enzyme'
describe("Footer Component testing",()=>{
    const wrapper=shallow(<Footer/>)
    it("check Footer contain footer tag with Jean Station Copyright",()=>{
        expect(wrapper.find(
            <footer className="main_footer">Jean Station Copyright</footer>)).toBeTruthy()
    });
})