import re
from playwright.sync_api import Page, expect


def test_generate_cover_letter(page: Page):
    """
    Tests that you can generate a cover letter
    """
    page.goto("localhost:3000")
    linkedin_input_loc = page.locator("#linkedin")
    linkedin_input_loc.scroll_into_view_if_needed()
    linkedin_input_loc.fill("https://www.linkedin.com/in/darrenhoang/", timeout=5000)
    page.locator("#company").fill("Experian", timeout=5000)
    page.get_by_role("button", name="Generate").click(timeout=5000)
    # Waiting longer since the cover letter needs to be generated
    expect(page.locator(".show")).to_be_visible(timeout=30000)
    restart_button_loc = page.get_by_role("button", name="Restart")
    restart_button_loc.scroll_into_view_if_needed(timeout=5000)
    expect(restart_button_loc).to_be_visible(timeout=5000)
    save_letter_button_loc = page.get_by_role("button", name="Save Letter")
    expect(save_letter_button_loc).to_be_visible(timeout=5000)

def test_login(page: Page):
    """
    Tests login functionality
    """
    username = "darren"
    password = "password"
    page.goto("localhost:3000")
    login_button_loc = page.get_by_role("button", name="LOGIN")
    login_button_loc.click()
    username_loc = page.locator("#loginUsername")
    username_loc.fill(username)
    password_loc = page.locator("#loginPassword")
    password_loc.fill(password)
    login_button_loc = page.get_by_role("button", name="Login").last
    login_button_loc.click()
    saved_loc = page.get_by_role("button", name="SAVED")
    expect(saved_loc).to_be_visible()
