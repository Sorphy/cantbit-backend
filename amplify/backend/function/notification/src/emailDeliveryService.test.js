const { generateEmailTemplate } = require("./emailDeliveryService"); // Import the generateEmailTemplate function

describe("generateEmailTemplate", () => {
  it("should generate a valid email template", () => {
    // Arrange
    const message = "Test Message";

    // Act
    const emailTemplate = generateEmailTemplate(message);

    // Assert
    expect(emailTemplate).toHaveProperty("Subject");
    expect(emailTemplate.Subject).toBe("Your Email Subject");

    expect(emailTemplate).toHaveProperty("Body.Text.Data");
    expect(emailTemplate.Body.Text.Data).toContain(message);
  });

  it("should generate an email template with a greeting", () => {
    // Arrange
    const message = "Test Message";

    // Act
    const emailTemplate = generateEmailTemplate(message);

    // Assert
    expect(emailTemplate.Body.Text.Data).toContain("Hello");
  });

  // Add more test cases as needed to cover different scenarios.
});
