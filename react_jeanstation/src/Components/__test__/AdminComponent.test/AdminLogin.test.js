import AdminLogin from '../../AdminComponents/AdminLogin/AdminLogin'
import enzyme,{shallow} from 'enzyme'
describe("AdminLogin Component testing",()=>{
    const wrapper=shallow(<AdminLogin/>)
    it("check AdminLogin contain label for password",()=>{
        expect(wrapper.find(<label htmlFor="exampleInputPassword1"><b>Password</b></label>)).toBeTruthy();
    });

    it("check AdminLogin contain Login button",()=>{
        expect(wrapper.find(
            <button type="submit" className="btn btn-primary">LogIn</button>
        )).toBeTruthy();
    });

    it("check AdminLogin contain div with login_admin_form class",()=>{
        expect(wrapper.find('form.login_admin_form')).toBeTruthy();
    });
   
    it("check AdminLogin contain div with loginForm class",()=>{
        expect(wrapper.find('div.loginForm')).toBeTruthy();
    });
})