<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <b-card
          header="Sign in to your account"
          header-tag="header"
        >
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="username"
                type="email"
                required
                placeholder="E-mail"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-input type="password" id="text-password" v-model="password"></b-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'anime',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
    }
  }
}
</script>
