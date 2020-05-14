<template>
    <div>
        <section class="item3">
            <div class="register" >
                <form name="form"  method="post">
                    <label>
                        <input type="radio" id="teacher" name="teacher"><span>I'm teacher</span>
                        <a class="vl"></a>
                        <input type="radio" id="student" name="student"><span>I'm student</span>
                    </label>
                    <input type="text" id="fullName" name="fullName" placeholder="Full Name">
                    <input type="text" id="email" name="email" placeholder="E-mail">
                    <input type="text" id="phone" name="phone" placeholder="Phone Number" />
                    <input type="password" id="passWord" name="passWord" placeholder="Password" />
                    <input type="password" id="passWordConfirmation" name="passWord" placeholder="Confirm Password" />
                    <select id="destination" name="country">
                        <option value="0">Select your school level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                    <input type="checkbox" id="myCheck" name="agree"><span>I have read and agree / agreed with the terms and conditions.</span>
                    <input type="submit" name="submit" value="Save">
                </form>
    </div>
</template>

<script>
    export default {
        name: "registerForm"
    }
</script>

<style scoped>

</style>