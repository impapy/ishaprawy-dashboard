import React from "react"
import Layout from "../components/UI/Layout"
import { Form, Formik } from "formik"
import ImageUpload from "components/ImageUpload"

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values, isSubmitting }) => (
          <Form>
            <ImageUpload name="image" />
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Dashboard
