import streamlit as st
import requests

st.set_page_config(page_title="Resume Builder", layout="wide")

# ---------------------
# Header
# ---------------------
st.title("AI Resume Builder")
st.caption("Powered by AWS + Streamlit Architecture")

# ---------------------
# Form Input Engine
# ---------------------
with st.form("resume_form"):
    name = st.text_input("Full Name")
    email = st.text_input("Email Address")
    skills = st.text_area("Skills (comma separated)")
    projects = st.text_area("Projects (one per line)")
    
    submit = st.form_submit_button("Generate Resume")

# ---------------------
# API Integration Layer
# ---------------------
if submit:
    payload = {
        "name": name,
        "email": email,
        "skills": skills,
        "projects": projects.split("\n")
    }

    st.info("Submitting data to backend pipeline…")

    try:
        response = requests.post(
            "https://your-backend-api-url/resume",
            json=payload
        )
        result = response.json()

        st.success("Resume generated successfully!")
        st.download_button(
            label="Download Resume PDF",
            data=result["pdf"],
            file_name="resume.pdf",
            mime="application/pdf"
        )
    except Exception as e:
        st.error(f"Error: {e}")
