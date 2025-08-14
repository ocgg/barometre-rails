# Preview all emails at http://localhost:3000/rails/mailers/contact_mailer
class ContactMailerPreview < ActionMailer::Preview
  def contact_email
    dummy_data = {
      email: "foo@baz.bar",
      message: "Ouiiiiii euhhh bonjouuuuuur euuuhhh"
    }
    ContactMailer.with(dummy_data).contact_email
  end
end
